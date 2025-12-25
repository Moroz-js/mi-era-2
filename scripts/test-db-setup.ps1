# PowerShell script to test database setup and migrations
# Run with: .\scripts\test-db-setup.ps1

Write-Host "🚀 mi-Era Database Setup Test" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "1️⃣  Checking Docker..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running!" -ForegroundColor Red
    Write-Host "   Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker is running" -ForegroundColor Green
Write-Host ""

# Start PostgreSQL container
Write-Host "2️⃣  Starting PostgreSQL container..." -ForegroundColor Yellow
docker-compose up -d postgres
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start PostgreSQL" -ForegroundColor Red
    exit 1
}
Write-Host "✅ PostgreSQL container started" -ForegroundColor Green
Write-Host ""

# Wait for PostgreSQL to be ready
Write-Host "3️⃣  Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0
$ready = $false

while ($attempt -lt $maxAttempts -and -not $ready) {
    $attempt++
    $healthCheck = docker exec mi-era-postgres pg_isready -U postgres 2>&1
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
    } else {
        Write-Host "   Attempt $attempt/$maxAttempts..." -ForegroundColor Gray
        Start-Sleep -Seconds 1
    }
}

if (-not $ready) {
    Write-Host "❌ PostgreSQL failed to start within 30 seconds" -ForegroundColor Red
    exit 1
}
Write-Host "✅ PostgreSQL is ready" -ForegroundColor Green
Write-Host ""

# Install dependencies if needed
Write-Host "4️⃣  Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing npm packages..." -ForegroundColor Gray
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Dependencies ready" -ForegroundColor Green
Write-Host ""

# Run migration test
Write-Host "5️⃣  Running migration test..." -ForegroundColor Yellow
Write-Host ""
npm run db:test-migration
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Migration test failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✨ All tests passed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  - View database: npm run db:studio" -ForegroundColor White
Write-Host "  - Stop database: docker-compose down" -ForegroundColor White
Write-Host ""
