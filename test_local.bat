@echo off
echo ========================================================
echo   Starting Local Arcade Web Server on http://localhost:8000
echo ========================================================
echo.
echo Close this window to stop the server.
echo.
start http://localhost:8000
python -m http.server 8000