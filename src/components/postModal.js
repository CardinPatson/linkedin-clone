import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
	const [editorText, setEditorText] = useState("");
	const [shareImage, setShareImage] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const [assetArea, setAssetArea] = useState("");

	const handleChange = (e) => {
		const image = e.target.files[0];

		if (image === "" || image === undefined) {
			alert(`not an image, the file is a ${typeof image}`);
			return;
		}
		console.log(image);
		setShareImage(image); //qui va mettre a jour la variable shareImage lorsqu'elle sera exécuté
		console.log(shareImage);
	};
	const switchAssetArea = (area) => {
		setShareImage("");
		setVideoLink("");
		setAssetArea(area);
	};

	const postArticle = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) {
			return;
		}
		const payload = {
			image: shareImage,
			video: videoLink,
			user: props.user,
			description: editorText,
			timestamp: firebase.firestore.Timestamp.now(),
		};
		props.postArticle(payload);
		reset(e);
	};

	const reset = (e) => {
		setEditorText("");
		setShareImage("");
		setVideoLink("");
		setAssetArea("");
		props.handleClick(e);
	};
	// const mediaSource = new MediaSource();
	// const img = document.getElementById("media");
	// img.srcObject = mediaSource;
	return (
		<>
			{props.showModal === "open" && (
				<Container>
					<Content>
						<Header>
							<h2>Create a post </h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{props.user && props.user.photoURL ? (
									<img src={props.user.photoURL} />
								) : (
									<img src="/images/user.svg" />
								)}
								{props.user && props.user.displayName ? (
									<span>{props.user.displayName}</span>
								) : (
									<span>Name</span>
								)}
							</UserInfo>
							<Editor>
								<textarea
									value={editorText}
									onChange={(e) => setEditorText(e.target.value)}
									autoFocus={true}
									placeholder="De quoi voulez vous discuter"
								/>
								{assetArea === "image" ? (
									<UploadImage>
										<input
											type="file"
											accept="image/gif, image/png,image/jpeg"
											name="image"
											id="file"
											style={{ display: "none" }}
											onChange={handleChange}
										/>
										<p>
											<label htmlFor="file">Choisissez une image</label>
										</p>
										{shareImage && (
											<img id="media" src={URL.createObjectURL(shareImage)} />
										)}
									</UploadImage>
								) : (
									assetArea === "media" && (
										<>
											<input
												type="text"
												placeholder="Ici le lien d'une video"
												value={videoLink}
												onChange={(e) => setVideoLink(e.target.value)}
											/>
											{videoLink && (
												<ReactPlayer width={"100%"} url={videoLink} />
											)}
											{/* REACTPLAYER EST IMPORTER DE : npm install ReactPlayer */}
										</>
									)
								)}
							</Editor>
						</SharedContent>
						<SharedCreation>
							<AttachAssets>
								<AssetButton onClick={() => switchAssetArea("image")}>
									{/* LORS DU CLICK ON AFFICHER LA PLACE IMAGE  */}
									<img src="/images/share-image.svg" />
								</AssetButton>
								<AssetButton onClick={() => switchAssetArea("media")}>
									{/* LORS DU CLICK ON AFFICHE LA PLACE DE LA VIDEO */}
									<img src="/images/share-video.svg" />
								</AssetButton>
							</AttachAssets>
							<ShareComment>
								<AssetButton>
									<img src="/images/share-comment.svg" />
									comment
								</AssetButton>
							</ShareComment>

							<PostButton
								disabled={!editorText ? true : false}
								onClick={(event) => {
									postArticle(event);
								}}
							>
								Post
							</PostButton>
						</SharedCreation>
					</Content>
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;

	background-color: transparent;
	animation: fadeIn 0.3s;
`;
const Content = styled.div`
	width: 100%;
	max-width: 552px;
	background-color: white;
	max-height: 90%;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: block;
	padding: 16px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.6);
	font-weight: 400;
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		height: 30px;
		width: 30px;
		min-width: auto;
		color: rgba(0, 0, 0, 0.15);
		svg,
		img {
			pointer-events: none;
		}
	}
`;

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: auto;
	vertical-align: baseline;
	background: transparent;
	padding: 8px 12px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 24px;
	svg,
	img {
		width: 48px;
		height: 48px;
		background-clip: content-box;
		border-radius: 50%;
		border: 2px solid transparent;
	}
	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 1.5;
		margin-left: 5px;
	}
`;

const SharedCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	color: rgba(0, 0, 0, 0.7);
	opacity: 0.5;
`;
const AttachAssets = styled.div`
	display: flex;
	align-items: center;
	padding-right: 8px;
	${AssetButton} {
		width: 40px;
	}
`;

const ShareComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	border-left: 1px solid rgba(0, 0, 0, 0.15);
	${AssetButton} {
		svg {
			margin-right: 5px;
		}
	}
`;

const PostButton = styled.button`
	min-width: 60px;
	border-radius: 20px;
	padding-left: 16px;
	padding-right: 16px;
	background: ${(props) => (props.disabled ? "rgba(0 ,0,0,0.8)" : "#0a66c2")};
	color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
	&:hover {
		background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
	}
`;

const Editor = styled.div`
	padding: 12px 24px;

	textarea {
		/* border: none; */
		width: 100%;
		min-height: 100px;
		resize: none;
		/* &:focus {
      border: none;
    } */
	}
	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`;
const UploadImage = styled.div`
	text-align: center;
	img {
		width: 100%;
	}
`;
const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		postArticle: (payload) => dispatch(postArticleAPI(payload)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
// export default PostModal;
