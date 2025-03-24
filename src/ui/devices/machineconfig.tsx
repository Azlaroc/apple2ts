import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGear,
} from "@fortawesome/free-solid-svg-icons"
import { handleGetMachineName, handleGetMemSize } from "../main2worker"
import { setPreferenceMachineName, setPreferenceRamWorks } from "../localstorage"
import PopupMenu from "../controls/popupmenu"

export const MachineConfig = (props: { updateDisplay: UpdateDisplay }) => {
  const [popupLocation, setPopupLocation] = React.useState<[number, number]>()

  const handleClick = (event: React.MouseEvent) => {
    setPopupLocation([event.clientX, event.clientY])
  }

  const machineNames: MACHINE_NAME[] = ["APPLE2EU", "APPLE2EE"]
  const roms = ["Apple IIe (unenhanced)", "Apple IIe (enhanced)"]
  const names = ["64 KB (AUX)", "512 KB", "1024 KB", "4 MB", "8 MB"]
  const sizes = [64, 512, 1024, 4096, 8192]
  const extraMemSize = handleGetMemSize()
  const machineName = handleGetMachineName()

  return (
    <span>
      <button
        id="basic-button"
        className="push-button"
        title="Machine Configuration"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faGear} />
      </button>

      <PopupMenu
        location={popupLocation}
        onClose={() => { setPopupLocation(undefined) }}
        menuItems={[[
          ...[0, 1].map((i) => (
            {
              label: roms[i],
              isSelected: () => { return machineName === machineNames[i] },
              onClick: () => {
                setPreferenceMachineName(machineNames[i])
                props.updateDisplay()
              }
            }
          )),
          ...[{ label: "-" }],
          ...[0, 1, 2, 3, 4].map((i) => (
            {
              label: names[i],
              isSelected: () => { return extraMemSize === sizes[i] },
              onClick: () => {
                setPreferenceRamWorks(sizes[i])
                props.updateDisplay()
              }
            }
          ))
        ]]}
      />

    </span>
  )
}
