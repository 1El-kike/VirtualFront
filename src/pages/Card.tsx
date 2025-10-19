import { Route, Routes } from "react-router-dom"
import CardCreate from "../components/Card/CardCreate"
import CardList from "../components/Card/CardList"
import HomeCard from "../components/Card/HomeCard"

const Card: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeCard />} />
            <Route path="/list" element={<CardList />} />
            <Route path="/create" element={<CardCreate />} />
        </Routes>
    )
}

export default Card