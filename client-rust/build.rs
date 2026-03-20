#[cfg(windows)]
fn main() {
    let mut res = winres::WindowsResource::new();
    res.set("CompanyName", "Noogler");
    res.set("FileDescription", "Noogler Local Agent");
    res.set("ProductName", "Noogler");
    res.set("InternalName", "intern-local");
    res.set("OriginalFilename", "intern-local.exe");
    res.set("LegalCopyright", "Copyright (c) Noogler");

    if let Err(err) = res.compile() {
        panic!("failed to compile Windows resources: {err}");
    }
}

#[cfg(not(windows))]
fn main() {}
