import {
	Button,
	Card,
	Flex,
	Heading,
	Image,
	Menu,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Text,
	TextAreaField,
	TextField,
	useBreakpointValue,
	useTheme,
	View,
} from '@aws-amplify/ui-react'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { mockMessages, mockChannels } from '../../mockdata'

export default function Home({ currentChannel, channels }) {
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
				<NotificationHeader channels={channels} />
				<View flex={{ base: 0, medium: 1 }}>
					<View margin="0 auto" maxWidth={{ base: '95vw', medium: '100vw' }}>
						<Heading
							padding={tokens.space.small}
							backgroundColor={'lightgrey'}
							textAlign={'center'}
							level={3}
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

const NotificationHeader = ({ channels }) => {
	const router = useRouter()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const variation = useBreakpointValue({
		base: 'isMobile',
		medium: 'isTabletOrHigher',
	})
	const toggleMenu = (channelId) => {
		setIsMenuOpen(false)
		//naviate to new channel

		router.push(`/channels/${channelId}`)
		console.log('registered')
	}

	const NotificationDisplay = ({ channels }) => {
		if (variation === 'isMobile') {
			return (
				<Flex>
					<Menu
						isOpen={isMenuOpen}
						menuAlign="start"
						onOpenChange={() => {
							setIsMenuOpen(!isMenuOpen)
						}}
					>
						<ChannelList channels={channels} handleMenuToggle={toggleMenu} />
					</Menu>
				</Flex>
			)
		} else if (variation === 'isTabletOrHigher') {
			return <ChannelList channels={channels} handleMenuToggle={toggleMenu} />
		}
	}
	return <NotificationDisplay channels={channels} />
}

const ChannelList = ({ handleMenuToggle, channels }) => {
	console.log('the channels', channels)
	return (
		<View>
			<Table variation="striped" highlightOnHover>
				<TableHead>
					<TableRow>
						<TableCell as="th">Channels</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{channels.map((channel) => (
						<TableRow
							key={channel.channelId}
							onClick={() => {
								handleMenuToggle(channel.channelId)
							}}
						>
							<TableCell>{channel.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</View>
	)
}

const MessageList = ({ messages }) => {
	return (
		<Flex
			flex="1"
			backgroundColor="white"
			style={{ overflowY: 'scroll' }}
			direction="column-reverse"
			padding="5px"
		>
			{messages.map((msg) => (
				<MessageItem key={msg.id} msg={msg} />
			))}
		</Flex>
	)
}

const MessageItem = ({ msg }) => {
	const { tokens } = useTheme()
	const myUsername = 'mtliendo'
	const isMyMsg = msg.username === myUsername
	const isEdited = msg.createdAt !== msg.updatedAt

	return (
		<Card
			borderRadius={tokens.radii.small}
			variation="elevated"
			alignSelf={isMyMsg ? 'end' : 'start'}
			width={{ base: '300px', medium: '450px' }}
			backgroundColor={isMyMsg ? '#007aff' : '#DDDDDD'}
		>
			<Flex>
				<Image
					borderRadius={tokens.radii.small}
					src={msg.profilePic}
					height="50px"
					width={'50px'}
					alt="avatar"
				/>

				<View>
					<Flex>
						<Heading level={5} color={isMyMsg ? 'white' : 'black'}>
							{msg.username}{' '}
							<Text
								as="span"
								color={isMyMsg ? 'white' : 'black'}
								fontSize={'12px'}
								fontWeight="normal"
							>
								{msg.createdAt}
							</Text>
						</Heading>
					</Flex>

					<Text display={'inline'} color={isMyMsg ? 'white' : 'black'}>
						{msg.content}{' '}
					</Text>
					{isEdited && (
						<Text
							as="span"
							color={isMyMsg ? 'white' : 'black'}
							fontSize={'12px'}
						>
							{' '}
							(edited)
						</Text>
					)}
				</View>
			</Flex>
		</Card>
	)
}

const InputArea = ({ onMessageSend }) => {
	const [imageName, setImageName] = useState()
	const [messageText, setMessageText] = useState('')
	return (
		<View
			style={{
				borderTop: '1px solid lightgray',
				padding: '5px',
			}}
		>
			<View>
				<TextAreaField
					placeholder="type a message..."
					rows={2}
					onChange={(e) => {
						setMessageText(e.target.value)
					}}
					value={messageText}
				/>
				<hr />
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<TextField
						type={'file'}
						onChange={(e) => setImageName(e.target.files[0].name)}
					/>
					<Button
						variation="primary"
						onClick={() => {
							onMessageSend({
								id: 23,
								channelId: 'asdf1234',
								createdAt: 1234445,
								updatedAt: 2334445,
								username: 'mtliendo',
								profilePic: 'https://github.com/mtliendo.png',
								content: messageText,
							})
							setMessageText('')
						}}
					>
						Send
					</Button>
				</Flex>
			</View>
		</View>
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
