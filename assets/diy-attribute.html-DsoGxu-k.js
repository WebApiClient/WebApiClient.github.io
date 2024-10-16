import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as t,o as e}from"./app-DAvQOTm3.js";const n={};function h(l,i){return e(),a("div",null,i[0]||(i[0]=[t(`<h1 id="_3-custom-attributes" tabindex="-1"><a class="header-anchor" href="#_3-custom-attributes"><span>3. Custom Attributes</span></a></h1><p>WebApiClient provides many built-in attributes, including interface-level, method-level, and parameter-level attributes. They respectively implement the <code>IApiActionAttribute</code>, <code>IApiActionFilterAttribute</code>, <code>IApiParameterAttribute</code>, <code>IApiParameterable</code>, and <code>IApiReturnAttribute</code> interfaces.</p><h2 id="_3-1-customizing-iapiparameterattribute" tabindex="-1"><a class="header-anchor" href="#_3-1-customizing-iapiparameterattribute"><span>3.1 Customizing IApiParameterAttribute</span></a></h2><p>For example, if the server requires submission in <code>x-www-form-urlencoded</code> format, and the interface design is not ideal, the current requirement is to submit a JSON text <code>fieldX={X}</code> and <code>fieldY={Y}</code>. Here is how we design the corresponding interface:</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">HttpHost</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/upload&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ITask</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">UploadAsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">FormField</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">][</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">AliasAs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;fieldX&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> xJson</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">FormField</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">][</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">AliasAs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;fieldY&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> yJson</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Clearly, the parameter type <code>string</code> for our interface is too broad and lacks constraints. We would like it to be like this:</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">HttpHost</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/upload&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ITask</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">UploadAsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">FormFieldJson</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">X</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> fieldX</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">FormFieldJson</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Y</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> fieldY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>[FormFieldJson]</code> attribute serializes the parameter value into JSON and uses it as a field content in the form.</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">AttributeUsage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">AttributeTargets</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">Parameter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#4078F2;--shiki-dark:#ABB2BF;">AllowMultiple</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> FormFieldJson</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Attribute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">IApiParameterAttribute</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> async</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Task</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> BeforeRequestAsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ApiActionContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ApiParameterDescriptor</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> parameter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> options</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">HttpApiConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">FormatOptions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> json</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">HttpApiConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">JsonFormatter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Serialize</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">parameter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">Value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">options</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> fieldName</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> parameter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">Name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      await </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">RequestMessage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">AddFormFieldAsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">fieldName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)]))}const r=s(n,[["render",h],["__file","diy-attribute.html.vue"]]),d=JSON.parse('{"path":"/en/old/senior/diy-attribute.html","title":"3. Custom Attributes","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"3.1 Customizing IApiParameterAttribute","slug":"_3-1-customizing-iapiparameterattribute","link":"#_3-1-customizing-iapiparameterattribute","children":[]}],"git":{"createdTime":1719119907000,"updatedTime":1719119907000,"contributors":[{"name":"Ezreal","email":"memory_of_you@hotmail.com","commits":1}]},"readingTime":{"minutes":0.59,"words":176},"filePathRelative":"en/old/senior/diy-attribute.md","localizedDate":"June 23, 2024","excerpt":"\\n<p>WebApiClient provides many built-in attributes, including interface-level, method-level, and parameter-level attributes. They respectively implement the <code>IApiActionAttribute</code>, <code>IApiActionFilterAttribute</code>, <code>IApiParameterAttribute</code>, <code>IApiParameterable</code>, and <code>IApiReturnAttribute</code> interfaces.</p>"}');export{r as comp,d as data};
