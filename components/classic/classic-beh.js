//Behavior实际上是一个构造器，它将构造一个行为。构造的行为我们需要定义一个变量classicBeh来接收它。
let classicBeh = Behavior({
  properties: {
    img: String,
    content: String,
    hidden:Boolean
  },
  data:{

  },
})
export { classicBeh } //输出classicBeh