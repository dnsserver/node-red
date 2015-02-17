module.exports = function(RED){
  function LowerCaseNode(config){
    RED.nodes.createNode(this,config);
    var node = this;
    console.log(node);
    console.log(config);
    this.on('input', function(msg,context){
      console.log(msg);
      console.log(context);
      if(msg.payload.test){
        node.status({fill:"red",shape:"ring",text:"msgs: "});
        msg.payload.test = msg.payload.test.toLowerCase();
      }
      node.send(msg);
    });

    this.on('close', function(done){
      // tidy up any state
      done();
    });
  }
  RED.nodes.registerType("lower-case", LowerCaseNode);
}
