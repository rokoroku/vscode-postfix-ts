import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'

export class ReturnTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, position: vsc.Position) {
    return CompletionItemBuilder
      .create('return', node)
      .description(`return expr`)
      .replace('return {{expr}}', position)
      .build()
  }

  canUse (node: ts.Node) {
    return super.canUse(node) || this.isNewExpression(node)
  }
}

export const build = () => new ReturnTemplate()
