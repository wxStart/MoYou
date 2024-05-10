
### 接口问题 网络请求 http
1. 无法访问http请求，安卓正常
+ NSAllowsArbitraryLoads 允许http访问
+ NSExceptionDomains 设置允许访问的域名
```xml

<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>   <!-- ！！！！ 这里要改为true -->
         
		<key>NSAllowsLocalNetworking</key>
		<true/>
		<key>NSExceptionDomains</key>  <!-- ！！！！ 这里要加上这个允许的访问的域名 NSExceptionDomains -->
		<dict>
		  <key>rap2api.taobao.org</key>
		  <dict>
			<key>NSExceptionAllowsInsecureHTTPLoads</key>
			<true/>
		  </dict>
		</dict>
</dict>

```
