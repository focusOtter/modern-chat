import { Flex, Heading, useTheme, View } from '@aws-amplify/ui-react'

import { useEffect, useState } from 'react'
import { mockMessages, mockChannels } from '../../mockdata'
import { InputArea } from '../../components/InputArea'
import { MessageList } from '../../components/Message'
import { ConversationBar } from '../../components/ConversationBar'

export default function Home({ currentChannel = {}, channels = [] }) {
	console.log({ currentChannel })
	console.log({ channels })
	const { tokens } = useTheme()
	const [totalMessages, setTotalMessages] = useState([])
	const handleMessageSend = (newMessage) => {
		setTotalMessages([newMessage, ...totalMessages])
	}

	useEffect(() => {
		//fetch the latest messages (can't be run in getStaticProps)
		//limit this to something like the latest 50 messages
		const messages = mockMessages.filter(
			(mckMsg) => mckMsg.channelId === currentChannel.channelId
		)

		setTotalMessages(messages)
	}, [currentChannel.channelId])
	return (
		<>
			<Flex direction={{ base: 'column', medium: 'row' }}>
				<ConversationBar channels={channels} />
				<View flex={{ base: 0, medium: 1 }}>
					<View margin="0 auto" maxWidth={{ base: '95vw', medium: '100vw' }}>
						<Heading
							style={{ borderBottom: '1px solid black' }}
							padding={tokens.space.small}
							textAlign={'center'}
							level={3}
							color={tokens.colors.blue[60]}
						>
							{currentChannel.name}
						</Heading>

						<Flex direction="column" height="85vh">
							<MessageList messages={totalMessages} />
							<InputArea onMessageSend={handleMessageSend} />
						</Flex>
					</View>
				</View>
			</Flex>
		</>
	)
}

export async function getStaticPaths() {
	const paths = mockChannels.map(({ channelId }) => ({ params: { channelId } }))
	console.log('these are the paths', paths)
	return {
		paths,
		fallback: true, //if someone created a channel since the last build,
	}
}

export async function getStaticProps({ params }) {
	console.log('these are the params', params)
	const channel = mockChannels.find(
		(mckChnl) => mckChnl.channelId === params.channelId
	)

	return {
		props: {
			currentChannel: channel,
			channels: mockChannels, //fetch this here because it could change often
		},
		revalidate: 10, //set the cache-headers to invalidate after 10 seconds.
	}
}
