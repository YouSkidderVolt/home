import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GitHub, Key, MessageSquare, Twitter } from 'react-feather';
import dayjs from 'dayjs';

import { DiscordPresence } from 'components/presence';
import { GitHubSection, ToolsSection } from 'components/section';
import { Header, Paragraph, SubHeader } from 'components/text';

import { BIRTHDAY, GITHUB_USERNAME } from 'lib/constants';
import { isDate } from 'lib/time';
import { GitHubPinnedRepo, useGitHubPinnedRepos } from 'lib/hooks';

interface Props {
	pinnedRepos: (GitHubPinnedRepo & { url: string })[];
}

export default function Home(props: Props) {
	const socials = [
		{
			link: 'https://github.com/RatchanonDev',
			icon: GitHub,
		},
		{
			link: 'https://twitter.com/TinyWiFi',
			icon: Twitter,
		},
		{
			link: 'https://keybase.io/theyottabyte',
			icon: Key,
		},
	];
	const [isBirthday, setIsBirthday] = useState(isDate(BIRTHDAY));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setIsBirthday(isDate(BIRTHDAY));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [intervalCheck]);

	const { data: github = props.pinnedRepos } =
		useGitHubPinnedRepos(GITHUB_USERNAME);

	return (
		<div>
			<div
				style={{
					marginBottom: '18px',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>

			</div>
			<Header>Hey, I&lsquo;m ~Volt {isBirthday ? '🥳' : '👋'}</Header>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m a <Age birthdate={BIRTHDAY}/>-year-old aspiring student.
			</Paragraph>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m learning Java currently and trying to creating multiplayer experiences for 
                                Minecraft: Java & Bedrock Edition.
			</Paragraph>
			<br />
			<SubHeader>What am I building? 🚀</SubHeader>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m currently working on nothing.
			</Paragraph>
			<br />
			<GitHubSection pinnedRepos={github!} />
			<br />
			<ToolsSection />
		</div>
	);
}

const Age = ({ birthdate }: { birthdate: string }) => {
	const [clicked, setClicked] = useState(false);

	const [year, setYear] = useState(dayjs().diff(birthdate, 'year'));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setYear(dayjs().diff(birthdate, 'year', true));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [birthdate, intervalCheck]);

	return (
		<span onClick={() => setClicked(!clicked)} className={'clickable'}>
			{clicked ? `~${year.toFixed(8)}` : Math.floor(year)}
		</span>
	);
};

export const getStaticProps: GetStaticProps<Props> = async function () {
	const pinnedRepos = await fetch(
		`https://gh-pinned-repos.egoist.sh/?username=${GITHUB_USERNAME}`
	).then(async response => response.json() as Promise<GitHubPinnedRepo[]>);

	return {
		props: {
			pinnedRepos: pinnedRepos.map(repo => ({
				...repo,
				url: `https://github.com/${repo.owner}/${repo.repo}`,
			})),
		},
	};
};
