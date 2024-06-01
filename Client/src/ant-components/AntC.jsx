import { useState } from 'react';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types'; 

export const ClickableHoverButton = ({clickContent, hoverContent}) =>{
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
  
    ClickableHoverButton.propTypes = {
      clickContent: PropTypes.string.isRequired,
      hoverContent: PropTypes.string.isRequired,
    };

    const hide = () => {
      setClicked(false);
      setHovered(false);
    };
  
    const handleHoverChange = (open) => {
      setHovered(open);
      setClicked(false);
    };
  
    const handleClickChange = (open) => {
      setHovered(false);
      setClicked(open);
    };
  
    const hover = <div>{hoverContent}</div>;
    const clickedContent = <div>{clickContent}</div>;
    return (
      <Popover
        style={{ width: 500 }}
        content={hover}
        title="Hover title"
        trigger="hover"
        open={hovered}
        onOpenChange={handleHoverChange}
      >
        <Popover
          content={
            <div>
              {clickedContent}
              <a onClick={hide}>Close</a>
            </div>
          }
          title="Click title"
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
        >
          <Button>Hover and click</Button>
        </Popover>
      </Popover>
    );
}