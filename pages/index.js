import { Button, Link, withAuthenticator } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { listRooms } from '../src/graphql/queries'
import NextLink from 'next/link'
import config from '../src/aws-exports'
import { Amplify } from 'aws-amplify'

Amplify.configure({ ...config, ssr: true })
function Home({ signOut, user }) {
	const [rooms, setRooms] = useState([])
	useEffect(() => {
		API.graphql({
			query: listRooms,
		}).then(({ data }) => {
			setRooms(data.listRooms.items)
		})
	}, [])
	return (
		<>
			Hey, {user.username}! Select a room to get started:
			<ul>
				{rooms.map((room) => (
					<li key={room.id}>
						<NextLink href={`/rooms/${room.id}`}>
							<Link>{room.name}</Link>
						</NextLink>
					</li>
				))}
			</ul>
			<Button onClick={signOut}>Sign Out</Button>
		</>
	)
}

export default withAuthenticator(Home, {
	signUpAttributes: ['email', 'given_name', 'family_name'],
})
