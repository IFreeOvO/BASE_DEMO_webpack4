const fs = require('fs')
const path = require('path')
const paser = require('@babel/parser') // 解析bundler文件
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

// 文件解析
const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8')
  // console.log(content)

  const ast = paser.parse(content, {
    sourceType: 'module' // 告诉他bundler里的依懒是以import 导入的
  }) // 得到抽象语法树
  // ast.program.body 里面 node 对象指的是每一行的内容
  // console.log(ast.program.body)

  // 获取ImportDeclaration类型节点,并保存依懒的文件名
  const dependencies = {}

  traverse(ast, {
    ImportDeclaration({ node }) {
      // console.log(node)
      const dirname = path.dirname(filename)
      // console.log(dirname, node.source.value)
      const newFile = ('./' + path.join(dirname, node.source.value)).replace(
        '\\',
        '/'
      )
      // console.log(newFile)
      dependencies[node.source.value] = newFile // 用键值对存储绝对和相对路径
    }
  })

  // console.log(dependencies)

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  // console.log(code)
  // 返回入口文件地址,和其依懒的模块地址,还有语法转义后的代码
  return {
    filename,
    dependencies,
    code
  }
}

// 函数作用是建立依懒图谱, 参数是入口文件
const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry)
  // console.log(entryModule)

  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]

    const { dependencies } = item
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j])) // 把分析好的依懒结果存储起来
      }
    }
  }

  // console.log(graphArray)

  const graph = {}

  // 做些数据结构上的转化
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })

  // console.log(graph) 
  return graph // 真正的依懒图谱
}

// const moduleInfo = moduleAnalyser('./src/index.js')
// console.log(moduleInfo)

// const graghInfoInfo = makeDependenciesGraph('./src/index.js')
// console.log(graghInfoInfo)


const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  // 定义localRequire方法把绝对路径改成相对路径
  return `
    (function(graph) {
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[module].code)
        return exports;
      };
      require('${entry}')
    })(${graph});
  `
}
const code = generateCode('./src/index.js')
console.log(code)