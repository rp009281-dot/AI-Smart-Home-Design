@echo off
title AI Smart Home Design - Startup
echo ========================================================
echo  Starting AI Powered Smart Home Design: Insights And Future
echo ========================================================
echo.

echo [1/2] Launching Backend Server on http://localhost:5000 ...
start "Smart Home Backend" cmd /k "cd /d "%~dp0backend" && npm start"

timeout /t 3 /nobreak > nul

echo [2/2] Launching Frontend Client on http://localhost:5173 ...
start "Smart Home Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo  Both servers have been started in separate windows!
echo  Frontend URL: http://localhost:5173
echo  Backend URL:  http://localhost:5000
echo ========================================================
echo.
pause
