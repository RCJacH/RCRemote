interface Response {
  transport?: {
    position: string;
    state: number;
  }
}

function wwr_onreply(results: string) {
  let ar = results.split("\n");
  let result: Response = {};
  for (var x = 0; x < ar.length; x++) {
    let tok = ar[x].split("\t");
    if (tok.length > 0) parse_tokens(tok, result);
  }
  return result;
}

function parse_tokens(tok: string[], obj: Response) {
  switch (tok[0]) {
    case "TRANSPORT":
      let transport = parse_transport_tokens(tok);
      if (transport) {
        obj["transport"] = transport;
      }
    case "CMDSTATE":
      break;
    case "SEND":
      break;
    case "NTRACK":
      break;
    case "TRACK":
      break;
  }
}

function parse_transport_tokens(tok: string[]) {
  if (tok.length > 4) {
    let transportState = parseInt(tok[1]);
    // if (tok[3] != last_repeat) {
    //   last_repeat = tok[3];
    // }
    let position = tok[4];
    if (transportState >= 0 && position)
      return {
        state: transportState,
        position: position
      }
  }
}

export { wwr_onreply };