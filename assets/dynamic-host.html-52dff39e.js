import{_ as n,p as s,q as a,a1 as e}from"./framework-5866ffd3.js";const t={},p=e(`<h1 id="动态host" tabindex="-1"><a class="header-anchor" href="#动态host" aria-hidden="true">#</a> 动态Host</h1><p>针对大家经常提问的动态Host,提供以下简单的示例供参阅；实现的方式不仅限于示例中提及的，<strong>原则上在请求还没有发出去之前的任何环节，都可以修改请求消息的RequestUri来实现动态目标的目的</strong></p><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code>    

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">LoggingFilter</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IDynamicHostDemo</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//直接传入绝对目标的方式</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpGet</span></span><span class="token punctuation">]</span>
        <span class="token return-type class-name">ITask<span class="token punctuation">&lt;</span>HttpResponseMessage<span class="token punctuation">&gt;</span></span> <span class="token function">ByUrlString</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Uri</span></span><span class="token punctuation">]</span> <span class="token class-name"><span class="token keyword">string</span></span> urlString<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//通过Filter的形式</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpGet</span></span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">UriFilter</span></span><span class="token punctuation">]</span>
        <span class="token return-type class-name">ITask<span class="token punctuation">&lt;</span>HttpResponseMessage<span class="token punctuation">&gt;</span></span> <span class="token function">ByFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//通过Attribute修饰的方式</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpGet</span></span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ServiceName</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;baiduService&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token return-type class-name">ITask<span class="token punctuation">&lt;</span>HttpResponseMessage<span class="token punctuation">&gt;</span></span> <span class="token function">ByAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*通过Attribute修饰的方式*/</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 表示对应的服务名</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServiceNameAttribute</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ApiActionAttribute</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">ServiceNameAttribute</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Name <span class="token operator">=</span> name<span class="token punctuation">;</span>
            OrderIndex <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span>MinValue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">OnRequestAsync</span><span class="token punctuation">(</span><span class="token class-name">ApiRequestContext</span> context<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">await</span> Task<span class="token punctuation">.</span>CompletedTask<span class="token punctuation">;</span>
            <span class="token class-name">IServiceProvider</span> sp <span class="token operator">=</span> context<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">;</span>
            <span class="token class-name">HostProvider</span> hostProvider <span class="token operator">=</span> sp<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>HostProvider<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//服务名也可以在接口配置时挂在Properties中</span>
            <span class="token class-name"><span class="token keyword">string</span></span> host <span class="token operator">=</span> hostProvider<span class="token punctuation">.</span><span class="token function">ResolveService</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">HttpApiRequestMessage</span> requestMessage <span class="token operator">=</span> context<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>RequestMessage<span class="token punctuation">;</span>
            <span class="token comment">//和原有的Uri组合并覆盖原有Uri</span>
            <span class="token comment">//并非一定要这样实现，只要覆盖了RequestUri,即完成了替换</span>
            requestMessage<span class="token punctuation">.</span>RequestUri <span class="token operator">=</span> requestMessage<span class="token punctuation">.</span><span class="token function">MakeRequestUri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token comment">/*通过Filter修饰的方式*/</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">///用来处理动态Uri的拦截器 </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UriFilterAttribute</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ApiFilterAttribute</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">Task</span> <span class="token function">OnRequestAsync</span><span class="token punctuation">(</span><span class="token class-name">ApiRequestContext</span> context<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> options <span class="token operator">=</span> context<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>HttpApiOptions<span class="token punctuation">;</span>
            <span class="token comment">//获取注册时为服务配置的服务名</span>
            options<span class="token punctuation">.</span>Properties<span class="token punctuation">.</span><span class="token function">TryGetValue</span><span class="token punctuation">(</span><span class="token string">&quot;serviceName&quot;</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">object</span></span> serviceNameObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> serviceName <span class="token operator">=</span> serviceNameObj <span class="token keyword">as</span> <span class="token class-name"><span class="token keyword">string</span></span><span class="token punctuation">;</span>
            <span class="token class-name">IServiceProvider</span> sp <span class="token operator">=</span> context<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">;</span>
            <span class="token class-name">HostProvider</span> hostProvider <span class="token operator">=</span> sp<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>HostProvider<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> host <span class="token operator">=</span> hostProvider<span class="token punctuation">.</span><span class="token function">ResolveService</span><span class="token punctuation">(</span>serviceName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">HttpApiRequestMessage</span> requestMessage <span class="token operator">=</span> context<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>RequestMessage<span class="token punctuation">;</span>
            <span class="token comment">//和原有的Uri组合并覆盖原有Uri</span>
            <span class="token comment">//并非一定要这样实现，只要覆盖了RequestUri,即完成了替换</span>
            requestMessage<span class="token punctuation">.</span>RequestUri <span class="token operator">=</span> requestMessage<span class="token punctuation">.</span><span class="token function">MakeRequestUri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> Task<span class="token punctuation">.</span>CompletedTask<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">Task</span> <span class="token function">OnResponseAsync</span><span class="token punctuation">(</span><span class="token class-name">ApiResponseContext</span> context<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//不处理响应的信息</span>
            <span class="token keyword">return</span> Task<span class="token punctuation">.</span>CompletedTask<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//以上代码中涉及的依赖项</span>
    <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IDBProvider</span>
    <span class="token punctuation">{</span>
        <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">SelectServiceUri</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> serviceName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DBProvider</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDBProvider</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">SelectServiceUri</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> serviceName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>serviceName <span class="token operator">==</span> <span class="token string">&quot;baiduService&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>serviceName <span class="token operator">==</span> <span class="token string">&quot;microsoftService&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;https://www.microsoft.com&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HostProvider</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IDBProvider</span> dbProvider<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">HostProvider</span><span class="token punctuation">(</span><span class="token class-name">IDBProvider</span> dbProvider<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dbProvider <span class="token operator">=</span> dbProvider<span class="token punctuation">;</span>
            <span class="token comment">//将HostProvider放到依赖注入容器中，即可从容器获取其它服务来实现动态的服务地址查询</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">internal</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ResolveService</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//如何获取动态的服务地址由你自己决定，此处仅以简单的接口定义简要说明</span>
            <span class="token keyword">return</span> dbProvider<span class="token punctuation">.</span><span class="token function">SelectServiceUri</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","dynamic-host.html.vue"]]);export{r as default};
