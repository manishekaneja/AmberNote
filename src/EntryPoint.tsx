import DragableContainer from "./components/DragableContainer";
import EditorContainer from "./components/EditorContainer";
import LoginPopup from "./components/LoginPopup";
import SidebarConatiner from "./components/SideBarContainer";

function EntryPoint() {
  return (
    <>
      <DragableContainer side={<SidebarConatiner />}>
        <EditorContainer />
      </DragableContainer>
      <LoginPopup />
    </>
  );
}

export default EntryPoint;
