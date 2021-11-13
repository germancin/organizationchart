import React from "react";
import PropTypes from "prop-types";
import "./my-node.css";

import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

const propTypes = {
    nodeData: PropTypes.object.isRequired
};

const MyNode = ({nodeData}) => {

    const ExpandMore = styled((props) => {
        const {expand, ...other} = props;
        return <IconButton {...other} />;
    })(({theme, expand}) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const nodeTheme = {
        cardHeaderStylePref: {
            padding: 0,
            border: "0px solid black",
            paddingRight: "6px",
            position: "absolute",
            top: "3px",
            right: "18px",
        },
        avatarStyle: {
            width: 70,
            height: 70,
            position: "absolute",
            top: "0px",
            bottom: "0px",
            left: "-10px",
            border: "2px solid blue",
            padding: "1px",
            margin: "auto",
        }
    }

    const selectNode = (e, id) => {
        const nodeContainer = document.getElementById(id);

        if (nodeContainer.querySelector('.MuiAvatar-root') !== undefined && nodeContainer.querySelector('.MuiAvatar-root') !== null) {
            let fourChildNode = nodeContainer.querySelector('.MuiAvatar-root');
            fourChildNode.style.boxShadow = "0px 0px 20px 1px blue";
        }

        // removing the chevron arrows.
        const chevronLeftArrow = document.querySelector(".oci-chevron-left");
        const chevronRightArrow = document.querySelector(".oci-chevron-right");


        if (chevronLeftArrow !== null && chevronLeftArrow !== undefined) {
            chevronLeftArrow.remove();
        }
        if (chevronRightArrow !== null && chevronRightArrow !== undefined) {
            chevronRightArrow.remove();
        }

        // check the ul classname and modify the sibling up with the right className
        if( nodeContainer && nodeContainer.nextElementSibling){
            const ulElement = nodeContainer.nextElementSibling;
            if(ulElement.classList.contains('children-hidden')){
                const iElements = nodeContainer.getElementsByTagName('i');
                for (let i = 0; i < iElements.length; i++) {
                    const item = iElements[i];
                    if(item.classList.contains('bottomEdge')) {
                        console.log("from the hover => children is hidden && adding not-expanded to i tag")
                        item.className = 'oc-edge verticalEdge bottomEdge oci not-expanded from-hover';
                    }
                }
            }
        }
    };

    const unselectNode = (e, id) => {
        const nodeContainer = document.getElementById(id);
        if (nodeContainer.querySelector('.MuiAvatar-root') !== undefined && nodeContainer.querySelector('.MuiAvatar-root') !== null) {
            let fourChildNode = nodeContainer.querySelector('.MuiAvatar-root');
            fourChildNode.style.borderColor = "blue";
            fourChildNode.style.boxShadow = "none";
        }
    };

    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(event){
        window.mousePosition = {"x":event.clientX, "y":event.clientY }
    });

    return (
        <Grid style={{border:"0px solid black", paddingRight:"15px"}}>

            <Card id={nodeData.id} sx={{minWidth: 220, minHeight: 55, paddingBottom: "0px"}}
                  onMouseOver={(event) => selectNode(event, nodeData.id)}
                  onMouseOut={(event) => unselectNode(event, nodeData.id)}
                  className={nodeData.arrow}
            >
                <Avatar
                    sx={nodeTheme.avatarStyle}
                    alt={nodeData.name}
                    src="avatar.jpeg"

                >
                </Avatar>

                <Grid container
                      sx={{
                          position: "relative",
                          left: "0px",
                          top: "0px",
                          paddingLeft: "70px",
                          textAlign: "left",
                          paddingTop: "8px",
                          paddingRight: "25px",
                          fontSize: "12px",
                          display: "flex",
                          flexDirection: "column",

                      }}>

                    <div>{nodeData.name}</div>
                    <div style={{textTransform: "uppercase", fontSize: "10px"}}>{nodeData.title}</div>

                </Grid>
                <CardHeader
                    style={nodeTheme.cardHeaderStylePref}
                    action={
                        <CardActions disableSpacing>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon sx={{position: "absolute"}}/>
                            </ExpandMore>
                        </CardActions>
                    }
                />

                <Collapse in={expanded} timeout="auto" unmountOnExit sx={{border: "0px solid blue"}}>
                    <CardContent sx={{
                        marginTop: "-10px",
                        border: "0px solid black",
                        textAlign: "left",
                        fontSize: "12px",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "72px",
                        paddingTop: "12px",
                        paddingRight: "25px",
                    }}>
                        <div>Id: {nodeData.id}</div>
                        <div style={{marginBottom: "3px"}}>german.gonzale@bomnin.com</div>
                        <div>1 Year 5 Months</div>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
};

MyNode.propTypes = propTypes;

export default MyNode;
