@echo off
REM Batch script to test database setup and migrations
REM Run with: scripts\test-db-setup.bat

echo.
echo ================================
echo mi-Era Database Setup Test
echo ================================
echo.

REM Check if Docker is running
echo 1. Checking Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running!
    echo Please start Docker Desktop and try again.
    exit /b 1
)
echo [OK] Docker is running
echo.

REM Start PostgreSQL container
echo 2. Starting PostgreSQL container...
docker-compose up -d postgres
if errorlevel 1 (
    echo [ERROR] Failed to start PostgreSQL
    exit /b 1
)
echo [OK] PostgreSQL container started
echo.

REM Wait for PostgreSQL to be ready
echo 3. Waiting for PostgreSQL to be ready...
set /a attempts=0
:wait_loop
set /a attempts+=1
if %attempts% gtr 30 (
    echo [ERROR] PostgreSQL failed to start within 30 seconds
    exit /b 1
)
docker exec mi-era-postgres pg_isready -U postgres >nul 2>&1
if errorlevel 1 (
    echo    Attempt %attempts%/30...
    timeout /t 1 /nobreak >nul
    goto wait_loop
)
echo [OK] PostgreSQL is ready
echo.

REM Install dependencies if needed
echo 4. Checking dependencies...
if not exist "node_modules" (
    echo    Installing npm packages...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        exit /b 1
    )
)
echo [OK] Dependencies ready
echo.

REM Run migration test
echo 5. Running migration test...
echo.
call npm run db:test-migration
if errorlevel 1 (
    echo.
    echo [ERROR] Migration test failed
    exit /b 1
)

echo.
echo ================================
echo All tests passed!
echo ================================
echo.
echo Next steps:
echo   - View database: npm run db:studio
echo   - Stop database: docker-compose down
echo.
