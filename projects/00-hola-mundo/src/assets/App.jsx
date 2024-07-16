import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App() {
    const formatUserName = (userName) => `@${userName}`
    return (
        <section className='App'>
            <TwitterFollowCard 
            formatUserName={formatUserName} 
            isFollowing={true} 
            userName="agusgomezdaddario" 
            name="Agustin Gomez DAddario" />

            <TwitterFollowCard 
            formatUserName={formatUserName} 
            isFollowing={false} 
            userName="midudev" 
            name="Miguel Angel Durán" />
        </section>
    )
}