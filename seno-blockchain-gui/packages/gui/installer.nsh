!include "nsDialogs.nsh"

; Add our customizations to the finish page
!macro customFinishPage
XPStyle on

Var DetectDlg
Var FinishDlg
Var SenoSquirrelInstallLocation
Var SenoSquirrelInstallVersion
Var SenoSquirrelUninstaller
Var CheckboxUninstall
Var UninstallSenoSquirrelInstall
Var BackButton
Var NextButton

Page custom detectOldSenoVersion detectOldSenoVersionPageLeave
Page custom finish finishLeave

; Add a page offering to uninstall an older build installed into the seno-blockchain dir
Function detectOldSenoVersion
  ; Check the registry for old seno-blockchain installer keys
  ReadRegStr $SenoSquirrelInstallLocation HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\seno-blockchain" "InstallLocation"
  ReadRegStr $SenoSquirrelInstallVersion HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\seno-blockchain" "DisplayVersion"
  ReadRegStr $SenoSquirrelUninstaller HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\seno-blockchain" "QuietUninstallString"

  StrCpy $UninstallSenoSquirrelInstall ${BST_UNCHECKED} ; Initialize to unchecked so that a silent install skips uninstalling

  ; If registry keys aren't found, skip (Abort) this page and move forward
  ${If} SenoSquirrelInstallVersion == error
  ${OrIf} SenoSquirrelInstallLocation == error
  ${OrIf} $SenoSquirrelUninstaller == error
  ${OrIf} $SenoSquirrelInstallVersion == ""
  ${OrIf} $SenoSquirrelInstallLocation == ""
  ${OrIf} $SenoSquirrelUninstaller == ""
  ${OrIf} ${Silent}
    Abort
  ${EndIf}

  ; Check the uninstall checkbox by default
  StrCpy $UninstallSenoSquirrelInstall ${BST_CHECKED}

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $DetectDlg

  ${If} $DetectDlg == error
    Abort
  ${EndIf}

  !insertmacro MUI_HEADER_TEXT "Uninstall Old Version" "Would you like to uninstall the old version of Seno Blockchain?"

  ${NSD_CreateLabel} 0 35 100% 12u "Found Seno Blockchain $SenoSquirrelInstallVersion installed in an old location:"
  ${NSD_CreateLabel} 12 57 100% 12u "$SenoSquirrelInstallLocation"

  ${NSD_CreateCheckBox} 12 81 100% 12u "Uninstall Seno Blockchain $SenoSquirrelInstallVersion"
  Pop $CheckboxUninstall
  ${NSD_SetState} $CheckboxUninstall $UninstallSenoSquirrelInstall
  ${NSD_OnClick} $CheckboxUninstall SetUninstall

  nsDialogs::Show

FunctionEnd

Function SetUninstall
  ; Set UninstallSenoSquirrelInstall accordingly
  ${NSD_GetState} $CheckboxUninstall $UninstallSenoSquirrelInstall
FunctionEnd

Function detectOldSenoVersionPageLeave
  ${If} $UninstallSenoSquirrelInstall == 1
    ; This could be improved... Experiments with adding an indeterminate progress bar (PBM_SETMARQUEE)
    ; were unsatisfactory.
    ExecWait $SenoSquirrelUninstaller ; Blocks until complete (doesn't take long though)
  ${EndIf}
FunctionEnd

Function finish

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $FinishDlg

  ${If} $FinishDlg == error
    Abort
  ${EndIf}

  GetDlgItem $NextButton $HWNDPARENT 1 ; 1 = Next button
  GetDlgItem $BackButton $HWNDPARENT 3 ; 3 = Back button

  ${NSD_CreateLabel} 0 35 100% 12u "Seno has been installed successfully!"
  EnableWindow $BackButton 0 ; Disable the Back button
  SendMessage $NextButton ${WM_SETTEXT} 0 "STR:Let's Farm!" ; Button title is "Close" by default. Update it here.

  nsDialogs::Show

FunctionEnd

; Copied from electron-builder NSIS templates
Function StartApp
  ${if} ${isUpdated}
    StrCpy $1 "--updated"
  ${else}
    StrCpy $1 ""
  ${endif}
  ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
FunctionEnd

Function finishLeave
  ; Launch the app at exit
  Call StartApp
FunctionEnd

; Section
; SectionEnd
!macroend
