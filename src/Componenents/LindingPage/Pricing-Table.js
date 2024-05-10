import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Container, Card, Typography, Button } from "@mui/material";

const Features = [
  {
    titre: "Basic Plan",
    price: "$10/month",
    Feature: ["10 GB Disk Space", "1 Year support", "500 queries"],
  },
  {
    titre: "Business Plan",
    price: "$20/month",
    Feature: ["20 GB Disk Space", "2 Year support", "1000 queries"],
  },
  {
    titre: "Enterprise Plan",
    price: "$40/month",
    Feature: ["40 GB Disk Space", "10 Year support", "2000 queries"],
  },
];

const PricingTable = () => {
  return (
    <div className="work-section-wrapper" id="Pricing-Table">
      <div className="work-section-top">
        <h1 className="primary-heading">Our Pricing Plans</h1>
        <Container sx={{ mt: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              mt: "100px",
            }}
          >
            {Features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  height: "10cm",
                  width: "8cm",
                  borderRadius: "20px",
                  p: "40px",
                  mb: "100px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "1px 5px 10px rgba(0,0,0,0.5)",
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontSize: "bold", ml: "20px" }}
                  gutterBottom
                >
                  {feature.titre}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "black", fontWeight: "bold", fontSize: 40 }}
                >
                  {feature.price}
                </Typography>

                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    position: "absolute",
                    top: "160px",
                  }}
                >
                  {feature.Feature.map((element, index) => (
                    <li
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography>{element}</Typography>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: "300px",
                    width: "70%",
                    borderRadius: "40px",
                  }}
                >
                  Select Plan
                </Button>
              </Card>
            ))}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default PricingTable;
