## 使用VS Code中的Cline插件

- Installed -> Configure MCP Server

## 设置cline_mcp_settings.json

``` json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": [
        "F:\\code\\mcp-tutorial\\build\\index.js"
      ]
    }
  }
}
```

--------

#### MCP使用JSON-RPC2.0作为客户端和服务器之间所有通信的消息格式。该协议定义了三种类型的消息：
##### 1.请求（Request）
- 唯一标识符（id）
- 要调用的方法名称（例如，tools/call）
- 方法的参数（如果有）
``` json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "weather",
    "arguments": {
      "location": "San Francisco"
    }
  }
}
```
##### 2.响应（Responses）
- 与对应Request相同的id
- 结果（成功）或错误（失败）
``` json
// 成功
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "temperature": 62,
    "conditions": "Partly cloudy"
  }
}
// 失败
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid location parameter"
  }
}
```
##### 3.通知（Notifications）
- 不需要响应的单向消息。通常从 Server 发送到 Client，以提供有关事件的更新或通知。
``` json
{
  "jsonrpc": "2.0",
  "method": "progress",
  "params": {
    "message": "Processing data...",
    "percent": 50
  }
}
```
#### JSON-RPC 定义了消息格式，但 MCP 还指定了这些消息如何在客户端和服务器之间传输。支持两种主要传输机制：
- stdio （标准输入/输出）：stdio 传输用于本地通信，其中 Client 和 Server 运行在同一台机器上
- HTTP + SSE (Server-Sent Events) / Streamable HTTP：HTTP+SSE 传输用于远程通信，其中 Client 和 Server 可能位于不同的计算机上
