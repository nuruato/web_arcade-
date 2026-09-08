@echo off
title Publish Arcade to GitHub
echo ========================================================
echo   Pushing Web Arcade to https://github.com/nuruato/web_arcade-
echo ========================================================
echo.
echo If a browser window opens, click 'Sign in with your browser' or 'Authorize'.
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! Your files are uploaded to GitHub!
    echo ========================================================
    echo.
    echo Next step:
    echo 1. Go to https://github.com/nuruato/web_arcade-/settings/pages
    echo 2. Under 'Branch', select 'main' and click Save.
    echo 3. Your game portal will be live in 1 minute!
) else (
    echo.
    echo Something went wrong. Check the error message above.
)
echo.
pause
