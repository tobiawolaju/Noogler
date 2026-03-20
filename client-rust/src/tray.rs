#[cfg(windows)]
use tray_item::TrayItem;

#[cfg(windows)]
use windows::Win32::System::Console::GetConsoleWindow;
#[cfg(windows)]
use windows::Win32::UI::WindowsAndMessaging::{ShowWindow, SW_HIDE};
#[cfg(windows)]
use windows_sys::Win32::UI::WindowsAndMessaging::{
    HICON as HICON_sys, IDI_APPLICATION as IDI_APPLICATION_sys, LoadIconW as LoadIconW_sys,
};

#[cfg(windows)]
pub struct TrayHandle {
    _tray: TrayItem,
}

#[cfg(windows)]
pub fn init_tray() -> Result<TrayHandle, String> {
    hide_console();

    let icon = load_default_icon()?;
    let mut tray =
        TrayItem::new("Intern Local", tray_item::IconSource::RawIcon(icon)).map_err(|e| e.to_string())?;

    tray.add_label("Intern Local running")
        .map_err(|e| e.to_string())?;

    tray.add_menu_item("Quit", || {
        std::process::exit(0);
    })
    .map_err(|e| e.to_string())?;

    Ok(TrayHandle { _tray: tray })
}

#[cfg(windows)]
fn hide_console() {
    unsafe {
        let hwnd = GetConsoleWindow();
        if hwnd.0 != 0 {
            let _ = ShowWindow(hwnd, SW_HIDE);
        }
    }
}

#[cfg(windows)]
fn load_default_icon() -> Result<HICON_sys, String> {
    let hicon = unsafe { LoadIconW_sys(0, IDI_APPLICATION_sys) };
    if hicon == 0 {
        return Err("failed to load default tray icon".to_string());
    }
    Ok(hicon)
}

#[cfg(not(windows))]
pub struct TrayHandle;

#[cfg(not(windows))]
pub fn init_tray() -> Result<TrayHandle, String> {
    Ok(TrayHandle)
}
