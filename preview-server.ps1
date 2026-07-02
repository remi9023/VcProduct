$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 5500
$MimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif" = "image/gif"
  ".svg" = "image/svg+xml"
  ".ico" = "image/x-icon"
}

$HostName = "127.0.0.1"
$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse($HostName), $Port)
$Listener.Start()
Write-Host "Preview server running at http://$HostName`:$Port/"

while ($true) {
  $Client = $Listener.AcceptTcpClient()
  try {
    $Stream = $Client.GetStream()
    $Reader = [System.IO.StreamReader]::new($Stream)
    $RequestLine = $Reader.ReadLine()

    while ($true) {
      $Line = $Reader.ReadLine()
      if ($null -eq $Line -or $Line -eq "") { break }
    }

    $RequestPath = "/"
    if ($RequestLine) {
      $Parts = $RequestLine -split " "
      if ($Parts.Length -gt 1) {
        $RequestPath = [Uri]::UnescapeDataString(($Parts[1] -split "\?")[0])
      }
    }

    if ($RequestPath -eq "/") {
      $RequestPath = "/index.html"
    }

    $RelativePath = $RequestPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
    $FilePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $RelativePath))

    if (-not $FilePath.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase) -or -not [System.IO.File]::Exists($FilePath)) {
      $Body = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
      $Header = [System.Text.Encoding]::ASCII.GetBytes("HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n")
    } else {
      $Body = [System.IO.File]::ReadAllBytes($FilePath)
      $Extension = [System.IO.Path]::GetExtension($FilePath).ToLowerInvariant()
      $ContentType = "application/octet-stream"

      if ($MimeTypes.ContainsKey($Extension)) {
        $ContentType = $MimeTypes[$Extension]
      }

      $Header = [System.Text.Encoding]::ASCII.GetBytes("HTTP/1.1 200 OK`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n")
    }

    $Stream.Write($Header, 0, $Header.Length)
    $Stream.Write($Body, 0, $Body.Length)
  } finally {
    $Client.Close()
  }
}
