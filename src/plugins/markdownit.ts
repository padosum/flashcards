import { inject } from 'vue';
import type { InjectionKey, Plugin, App } from 'vue';
import MarkdownIt, { type Options } from 'markdown-it';
import hljs from 'highlight.js';
import type Token from 'markdown-it/lib/token';

const markdownItKey: InjectionKey<MarkdownIt> = Symbol('_markdownIt_');

export const useMarkdownIt = (): MarkdownIt => {
  return inject(markdownItKey) as MarkdownIt;
};

export const markdownItPlugin: Plugin = {
  install(app: App) {
    const md: MarkdownIt = new MarkdownIt({
      html: true,
      linkify: true,
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre><code class="hljs">${
              hljs.highlight(code, { language: lang, ignoreIllegals: true })
                .value
            }</code></pre>`;
          } catch (__) {
            console.log('markdownit error');
          }
        }

        return (
          '<pre><code class="hljs">' +
          md.utils.escapeHtml(code) +
          '</code></pre>'
        );
      },
    });

    const defaultRender =
      md.renderer.rules.link_open ||
      function (
        tokens: Token[],
        idx: number,
        options: Options,
        _: any,
        self: any
      ) {
        return self.renderToken(tokens, idx, options);
      };
    md.renderer.rules.link_open = function (
      tokens: Token[],
      idx: number,
      options: Options,
      env: any,
      self: any
    ) {
      const aIdx = tokens[idx].attrIndex('target');

      if (aIdx < 0) {
        tokens[idx].attrPush(['target', '_blank']);
      } else {
        const attrs = tokens[idx].attrs;
        if (attrs) attrs[aIdx][1] = '_blank';
        tokens[idx].attrs = attrs;
      }

      return defaultRender(tokens, idx, options, env, self);
    };

    app.provide(markdownItKey, md);
  },
};
