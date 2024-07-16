import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
import { TittleCard } from './TittleCard'

const users = [
    { userName: 'agusgomezdaddario', name: 'Agustin Gomez DAddario', isFollowing: true },
    { userName: 'goncy', name: 'Gonzalo Pozzo', isFollowing: true },
    { userName: 'midudev', name: 'Miguel Angel Durán', isFollowing: true },
    { userName: 'alguien', name: 'Alguien'},
]

export function App() {
    const formatUserName = (userName) => `@${userName}`
    //Un componente es una factoria de elementos, es una función que al ejecutarla nos devuelve un elemento de react
    //Lo que renderiza react son los elementos
    //const formattedUserName = <span>@midudev</span> //Esto es un elemento de react
    const generico = {isFollowing: false, userName: 'alguien', formatUserName: formatUserName}
    return (
        <section className='App'>
            {/* <TwitterFollowCard 
            formatUserName={formatUserName}
            // formattedUserName={formattedUserName}
            initialIsFollowing={true} 
            userName="agusgomezdaddario" 
            //name="Agustin Gomez DAddario"
            >
                Agustin Gomez DAddario
            </TwitterFollowCard>

            <TwitterFollowCard 
            formatUserName={formatUserName} 
            // formattedUserName={formattedUserName}
            // isFollowing={false} 
            userName="midudev" 
            // name="Miguel Angel Durán"
            >
                Miguel Angel Duran
            </TwitterFollowCard>

            <TwitterFollowCard 
            formatUserName={formatUserName} 
            // formattedUserName={formattedUserName}
            initialIsFollowing={true} 
            >
            </TwitterFollowCard>

            <TwitterFollowCard {...generico}>
            </TwitterFollowCard> */}
            <TittleCard />
            {
                users.map(({userName, name, isFollowing }) => (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    ))
            }
        </section>
    )
}