import http.server
import socketserver
import sys

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)

Handler.extensions_map['.html'] = 'text/html; charset=utf-8'
Handler.extensions_map['.css'] = 'text/css; charset=utf-8'
Handler.extensions_map['.js'] = 'application/javascript; charset=utf-8'

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server: http://localhost:{PORT}")
    httpd.serve_forever()
