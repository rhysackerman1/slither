@echo off
echo [BATCH] Starting GameServer
:loop
   cls
   node src/server/index.js
   echo -------------------------------------------------------
   echo [BATCH] GameServer Shutdown, waiting 15 seconds before a restart.
   timeout /t 15 > nul
   goto loop