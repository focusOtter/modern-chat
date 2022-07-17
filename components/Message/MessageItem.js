import {
	Card,
	Flex,
	Heading,
	Image,
	Text,
	useTheme,
	View,
} from '@aws-amplify/ui-react'

export const MessageItem = ({ msg = {} }) => {
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
