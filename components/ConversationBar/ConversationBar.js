import { Flex, Menu, useBreakpointValue } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ChannelList } from '../ChannelList'

export const ConversationBar = ({ channels = [] }) => {
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
	}

	const ConversationDisplay = ({ channels = [] }) => {
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
	return <ConversationDisplay channels={channels} />
}
