///<reference path="main.ts">///

import '../pug/index.pug';
import '../css/index.css';

import wwr_onreply from "./onreply";
import * as buttons from "./buttons";



function init() {
  wwr_req_recur("TRANSPORT", 10);
  wwr_start();
  pressed_unit();
  pressed_unit();
}
