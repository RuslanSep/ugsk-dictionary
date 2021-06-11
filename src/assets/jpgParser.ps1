Import-Module ActiveDirectory
$ADusers= Get-ADUser -Filter {Department -ne "null"} -Properties thumbnailPhoto  | ? {$_.thumbnailPhoto}
foreach ($ADuser in $ADusers) {
$name = $ADuser.SamAccountName + ".jpg"
$ADuser.thumbnailPhoto | Set-Content $name -Encoding byte
}