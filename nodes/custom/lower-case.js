module.exports = function(RED){
  "use strict";
  var util = require("util");
  var vm = require("vm");

  function LowerCaseNode(config){
    var sandbox = {
        console:console,
        util:util,
        Buffer:Buffer,
        context: {
            global:RED.settings.functionGlobalContext || {}
        }
    };
    var context = vm.createContext(sandbox);
    RED.nodes.createNode(this,config);
    var node = this;
    node.nr_msg = node.nr_msg || 0;
    this.on('input', function(msg){
      node.nr_msg ++;
      if(msg.payload.test){
        node.status({fill:"grey",shape:"dot",text:"msgs: "+node.nr_msg});
        msg.payload.test = msg.payload.test.toLowerCase();
      }
      msg.payload.index = node.nr_msg;
      node.send(msg);
    });

    this.on('close', function(done){
      done();
    });
  }
  RED.nodes.registerType("lower-case", LowerCaseNode);
}
