@echo off
pushd "%~dp0"
"C:\Users\Hp\AppData\Local\Programs\Python\Launcher\py.exe" -3 -m http.server 8000 --bind 0.0.0.0
timeout /t 3 /nobreak > nul
"%~dp0node_modules\.bin\lt.cmd" --port 8000
popd
