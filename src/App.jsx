import { useState, useEffect } from "react";
import "./App.css";
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Models from "./Components/Models/Models";
import Configurator from "./Components/Configurator/Configurator";
import Calculator from "./Components/Calculator/Calculator";
import Charging from "./Components/Charging/Charging";
import Services from "./Components/Services/Services";
import Footer from "./Components/Footer/Footer";
import TestDriveModal from "./Components/Modals/TestDriveModal";
import DepositModal from "./Components/Modals/DepositModal";
import { CAR_MODELS } from "./data/evData";

const App = () => {
  const heroData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give in to", text2: "the electric era" },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  // Configurator selection
  const [configModelId, setConfigModelId] = useState("apex-gt");

  // Modals state
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveCarId, setTestDriveCarId] = useState("apex-gt");

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [currentConfigData, setCurrentConfigData] = useState(null);

  // Auto slide hero background if video is not playing
  useEffect(() => {
    console.log("[APP] state update -> activeTab:", activeTab, "| playStatus:", playStatus);
    if (activeTab !== "home" || playStatus) return;
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === 2 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTab, playStatus]);

  // Navigate to configurator with specific model
  const handleSelectModelForConfig = (modelId) => {
    setConfigModelId(modelId);
    setActiveTab("configurator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open test drive modal
  const handleOpenTestDrive = (modelId = "apex-gt") => {
    setTestDriveCarId(modelId);
    setIsTestDriveOpen(true);
  };

  // Open deposit modal with configured data
  const handleOpenDeposit = (configData = null) => {
    if (configData) {
      setCurrentConfigData(configData);
    } else {
      // Default to current model
      const defCar = CAR_MODELS.find((c) => c.id === configModelId) || CAR_MODELS[0];
      setCurrentConfigData({
        model: defCar,
        trim: defCar.trims[0],
        color: defCar.colors[0],
        wheel: defCar.wheels[0],
        interior: defCar.interiors[0],
        techPacks: [],
        totalPrice: defCar.basePrice,
      });
    }
    setIsDepositOpen(true);
  };

  return (
    <div className="app-container">
      {/* Background (Fixed & Adaptive) */}
      <Background
        playStatus={playStatus}
        heroCount={heroCount}
        isSubPage={activeTab !== "home"}
      />

      {/* Dimmed overlay for subpages */}
      {activeTab !== "home" && <div className="background-dimmed" />}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTestDrive={() => handleOpenTestDrive(configModelId)}
        onOpenDeposit={() => handleOpenDeposit()}
      />

      {/* Main Content Router */}
      <main className="main-content">
        {activeTab === "home" && (
          <Hero
            setPlayStatus={setPlayStatus}
            heroData={heroData[heroCount]}
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            playStatus={playStatus}
            onExploreClick={() => {
              setActiveTab("models");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenTestDrive={() => handleOpenTestDrive("apex-gt")}
          />
        )}

        {activeTab === "models" && (
          <Models
            onSelectModelForConfig={handleSelectModelForConfig}
            onOpenTestDrive={handleOpenTestDrive}
          />
        )}

        {activeTab === "configurator" && (
          <Configurator
            initialModelId={configModelId}
            onProceedToDeposit={(config) => handleOpenDeposit(config)}
          />
        )}

        {activeTab === "calculator" && (
          <Calculator
            onOpenTestDrive={handleOpenTestDrive}
            onOpenDeposit={() => handleOpenDeposit()}
          />
        )}

        {activeTab === "charging" && <Charging />}

        {activeTab === "services" && <Services />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenTestDrive={() => handleOpenTestDrive(configModelId)}
        onOpenDeposit={() => handleOpenDeposit()}
      />

      {/* Global Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        defaultModelId={testDriveCarId}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        configData={currentConfigData}
      />
    </div>
  );
};

export default App;
