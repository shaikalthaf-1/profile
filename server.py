#!/usr/bin/env python3
"""
Simple HTTP server for serving static HTML files in Replit environment.
Configured to serve on 0.0.0.0:5000 with proper headers for proxy/iframe usage.
"""

import http.server
import socketserver
import os
from functools import partial

class ReplotStaticHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler with Replit-optimized headers"""
    
    def end_headers(self):
        # Add cache control to prevent caching issues in Replit proxy
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        # CORS headers for iframe compatibility
        self.send_header('X-Frame-Options', 'ALLOWALL')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        super().end_headers()
    
    def log_message(self, format, *args):
        """Enhanced logging for debugging"""
        print(f"[{self.address_string()}] {format % args}")

def main():
    PORT = 5000
    HOST = "0.0.0.0"
    
    # Change to directory containing the HTML files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), ReplotStaticHandler) as httpd:
        print(f"✅ Server starting on http://{HOST}:{PORT}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🌐 Website will be available at your Replit preview URL")
        print("📱 Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    main()