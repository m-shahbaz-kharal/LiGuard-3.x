# backend/main.py
import webview
import threading
import os
import http.server
import socketserver

# Serve frontend/build as a static folder
def start_server():
    os.chdir('frontend/build')
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(('', 8000), handler) as httpd:
        print("Serving at http://localhost:8000")
        httpd.serve_forever()

def start_gui():
    webview.create_window(
        title='OpenHands AI Toolkit',
        url='http://localhost:8000',  # Load the React build
        width=1400,
        height=900,
        resizable=True,
    )
    webview.start()

if __name__ == '__main__':
    threading.Thread(target=start_server, daemon=True).start()
    start_gui()
