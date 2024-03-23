import{_ as n,o as s,c as a,a as e}from"./app-4oQOgnTe.js";const t={},p=e(`<h1 id="异常和异常处理" tabindex="-1"><a class="header-anchor" href="#异常和异常处理" aria-hidden="true">#</a> 异常和异常处理</h1><p>请求一个接口，不管出现何种异常，最终都抛出 HttpRequestException，HttpRequestException 的内部异常为实际具体异常，之所以设计为内部异常，是为了完好的保存内部异常的堆栈信息。</p><p>WebApiClient 内部的很多异常都基于 ApiException 这个抽象异常，也就是很多情况下，抛出的异常都是内为某个 ApiException 的 HttpRequestException。</p><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> model <span class="token operator">=</span> <span class="token keyword">await</span> api<span class="token punctuation">.</span><span class="token function">GetAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">HttpRequestException</span> ex<span class="token punctuation">)</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>ex<span class="token punctuation">.</span>InnerException <span class="token keyword">is</span> <span class="token class-name">ApiInvalidConfigException</span> configException<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 请求配置异常</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">HttpRequestException</span> ex<span class="token punctuation">)</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>ex<span class="token punctuation">.</span>InnerException <span class="token keyword">is</span> <span class="token class-name">ApiResponseStatusException</span> statusException<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 响应状态码异常</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">HttpRequestException</span> ex<span class="token punctuation">)</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>ex<span class="token punctuation">.</span>InnerException <span class="token keyword">is</span> <span class="token class-name">ApiException</span> apiException<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 抽象的api异常</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">HttpRequestException</span> ex<span class="token punctuation">)</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>ex<span class="token punctuation">.</span>InnerException <span class="token keyword">is</span> <span class="token class-name">SocketException</span> socketException<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// socket连接层异常</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">HttpRequestException</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 请求异常</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 异常</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","exception-process.html.vue"]]);export{k as default};
