import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState("Product Details");
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%', padding: "0 4%" }}>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="tabs example"
                sx={{ mb: 2 }}
            >
                <Tab value="Product Details" label="Product Details" />
                <Tab value="Product Reviews" label="Product Reviews" />
                <Tab value="Shipping & Returns" label="Shipping & Returns" />
            </Tabs>

            <Box sx={{ p: 3, boxShadow :"0 0 4px rgba(0,0,0,0.5)" }}>
                {activeTab === 'Product Details' && (
                    <div className="tabs-content-details">
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi esse voluptatum aspernatur, possimus nam assumenda voluptas odio harum delectus accusantium?
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reiciendis officia! Nostrum exercitationem eveniet officiis commodi nisi voluptatum veniam ab? Recusandae est sit maxime iusto?
                        </Typography>
                    </div>
                )}
                {activeTab === 'Product Reviews' && (
                    <div className="tabs-content-rating">
                        <Typography variant="body1">Rating</Typography>
                    </div>
                )}
                {activeTab === 'Shipping & Returns' && (
                    <div className="tabs-content-reviews">
                        <Typography variant="body1">Shipping & Returns</Typography>
                    </div>
                )}
            </Box>
        </Box>
    );
}

export default TabComponent;
