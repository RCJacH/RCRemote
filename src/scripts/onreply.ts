interface CommandState {
  id: string;
  state: boolean;
}

interface Response {
  transport?: {
    position: string;
    isRepeatOn: boolean;
    state: number;
  };
  cmdstate?: CommandState[];
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

function parse_tokens(tok: string[], result: Response) {
  switch (tok[0]) {
    case "TRANSPORT":
      let transport = parse_transport_tokens(tok);
      if (transport) {
        result["transport"] = transport;
      }
      break;
    case "CMDSTATE":
      let cmdstate: CommandState = parse_cmdstate(tok);
      if (cmdstate) {
        if (!("cmdstate" in result)) {
          result["cmdstate"] = [];
        }
        result["cmdstate"].push(cmdstate);
      }
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
    let isRepeatOn = parseInt(tok[3]) == 1;
    let position = tok[4];
    if (transportState >= 0 && position)
      return {
        state: transportState,
        isRepeatOn: isRepeatOn,
        position: position,
      }
  }
}

function parse_cmdstate(tok: string[]): CommandState {
  if (tok.length != 3 || tok[2] == '-1') { return; }
  return {
    id: tok[1],
    state: tok[2] == "1"
  }
}

export { wwr_onreply };