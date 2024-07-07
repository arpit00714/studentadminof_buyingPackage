import { Box, Card, Grid, IconButton, styled, Tooltip } from "@mui/material";
import { AttachMoney, Group, ShoppingCart, Store, ArrowRightAlt } from "@mui/icons-material";
import { Small } from "app/components/Typography";
import PropTypes from "prop-types";
import { alpha } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";
// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

function SliderValueLabel({ children }) {
  return <span className="valueLabel">{children}</span>;
}

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired
};

function valuetext(value) {
  return `${value}°C`;
}

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  300: "#66B2FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B3",
  900: "#003A75"
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025"
};

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(theme.palette.mode === "light" ? blue[200] : blue[300], 0.3)};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(theme.palette.mode === "light" ? blue[200] : blue[400], 0.5)};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(theme.palette.mode === "light" ? blue[200] : blue[400], 0.5)};
      outline: none;
      transform: scale(1.2);
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 99%;
    background-color: ${theme.palette.mode === "light" ? blue[200] : blue[700]};
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
  }

  & .valueLabel {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 12px;
    position: relative;
    top: -2em;
    text-align: center;
    align-self: center;
  }
`
);
export default function StatCards() {
  const cardList = [
    { name: "New Leads", amount: 3050, Icon: Group },
    { name: "This week Sales", amount: "$80,500", Icon: AttachMoney },
    { name: "Inventory Status", amount: "8.5% Stock Surplus", Icon: Store },
    { name: "Orders to deliver", amount: "305 Orders", Icon: ShoppingCart }
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={110}
        slots={{ valueLabel: SliderValueLabel }}
      />
    </Box>
  );
}
