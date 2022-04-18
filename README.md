# Kayra

If you expect to be loading a lot of large files, you may be better served by the filesFromPath helper. It reduces memory pressure by yielding File objects one by one as they're loaded from disk, instead of loading everything into memory. You can then issue multiple put requests to send each file to Web3.Storage.