

## 访问者模式

访问者模式（Visitor Pattern）是一种行为型设计模式，它的目的是在不改变已有数据结构的情况下，定义一个新的操作，将这个操作应用到数据结构中的每个元素上。

访问者模式包含两个核心概念：访问者（Visitor）和被访问者（Element）。访问者定义了新的操作，被访问者表示数据结构中的元素。当访问者需要对数据结构中的元素进行操作时，它会遍历整个数据结构，访问每个元素，并调用该元素的特定方法，从而实现对每个元素的操作。

访问者模式的主要优点是可以在不改变数据结构的情况下，定义新的操作，从而增加程序的灵活性和可扩展性。它也能够将相关操作集中在访问者中，使得代码更加清晰简洁。但是访问者模式也有一些缺点，例如增加了程序的复杂度，因为需要在访问者中定义新的操作，而且访问者需要了解被访问者的具体实现。

访问者模式在实际开发中有很多应用，例如在编译器、解释器、GUI 界面等领域中都有广泛应用。在 JavaScript 中，可以通过对数据结构中的元素定义特定方法，实现访问者模式。例如，在一个树形结构中，可以为每个节点定义一个 accept 方法，在访问者中遍历整个树形结构，调用每个节点的 accept 方法，并实现相应的操作。


```js
// 定义被访问者接口
class Element {
  accept(visitor) {
    throw new Error('accept method must be implemented');
  }
}

// 定义具体被访问者
class ConcreteElementA extends Element {
  accept(visitor) {
    visitor.visitConcreteElementA(this);
  }
}

class ConcreteElementB extends Element {
  accept(visitor) {
    visitor.visitConcreteElementB(this);
  }
}

// 定义访问者接口
class Visitor {
  visitConcreteElementA(element) {
    throw new Error('visitConcreteElementA method must be implemented');
  }

  visitConcreteElementB(element) {
    throw new Error('visitConcreteElementB method must be implemented');
  }
}

// 定义具体访问者
class ConcreteVisitor1 extends Visitor {
  visitConcreteElementA(element) {
    console.log('ConcreteVisitor1 is visiting ConcreteElementA');
  }

  visitConcreteElementB(element) {
    console.log('ConcreteVisitor1 is visiting ConcreteElementB');
  }
}

class ConcreteVisitor2 extends Visitor {
  visitConcreteElementA(element) {
    console.log('ConcreteVisitor2 is visiting ConcreteElementA');
  }

  visitConcreteElementB(element) {
    console.log('ConcreteVisitor2 is visiting ConcreteElementB');
  }
}

// 测试代码
const elements = [new ConcreteElementA(), new ConcreteElementB()];
const visitors = [new ConcreteVisitor1(), new ConcreteVisitor2()];

for (const visitor of visitors) {
  for (const element of elements) {
    element.accept(visitor);
  }
}
```

总结：其实就是 访问者身上挂载一些方法，然后将访问者整个对象传入被访问者，然后被访问者内部再调用这些方法。。。

擦，通俗说：在我的地盘，用你的方法。