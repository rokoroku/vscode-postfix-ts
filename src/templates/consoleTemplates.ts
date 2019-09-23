import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'

export class ConsoleTemplate extends BaseExpressionTemplate {

  constructor(private level: 'log' | 'warn' | 'error') {
    super()
  }

  buildCompletionItem(node: ts.Node, position: vsc.Position, suffix: string, indentSize?: number) {
    return CompletionItemBuilder
      .create(this.level, node, indentSize)
      .description(`console.${this.level}(expr)`)
      .replace(`console.${this.level}({{expr}})`)
      .build()
  }

  isConsoleExpression = (node: ts.Node) => node.kind === ts.SyntaxKind.Identifier && (node as ts.Identifier).text === 'console'

  canUse(node: ts.Node) {
    return super.canUse(node) && !this.isConsoleExpression(node) || this.isNewExpression(node)
  }
}

export const build = () => [
  new ConsoleTemplate('log'),
  new ConsoleTemplate('warn'),
  new ConsoleTemplate('error')
]
