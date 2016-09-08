@echo off
echo [BATCH] Starting MasterServer
:loop
   cls
   node src/index.js
   echo -------------------------------------------------------
   echo [BATCH] MasterServer Shutdown, waiting 15 seconds before a restart.
   timeout /t 15 > nul
   goto loop