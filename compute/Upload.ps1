# Setting the container name. Creates a container in which the files will be uploaded
$ContainerName = "database"

# fetching the Key from the storage account. this is needed to set the context.
$storageAccountKey = Get-AzureStorageKey $storageAccountName | %{ $_.Primary }

#create a storage context 
$context = New-AzureStorageContext -StorageAccountName $StorageAccountName -StorageAccountKey $storageAccountKey

#creates the container in your storage account. I am not if container already exists.
# you can check by get-storagecontainer and check for errors.
New-AzureStorageContainer $ContainerName -Permission Public -Context $context

# Getting the current folder from script execution path
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath 

# Set FileName(s)
$inFileName =  "newpricing.json"
$outFileName =  "vmchooserdb.json"
 
#fq name represents fully qualified name
$inFqFileName = $dir + "\" + $inFileName

#upload the current file to the blob
Set-AzureStorageBlobContent -Blob $outFileName -Container $ContainerName -File $inFqFileName -Context $context -Force 
