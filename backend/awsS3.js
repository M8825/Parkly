const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "parklyy";

const singleFilePathUpload = async ({ filePath, public }) => {
	const path = require("path");
	const fs = require("fs");
	const { ext } = path.parse(filePath, public);

	const Key = new Date().getTime().toString() + ext;

	const buffer = await fs.promises.readFile(filePath);

	const uploadParams = {
		Bucket: NAME_OF_BUCKET,
		Key: public ? `spots/${Key}` : Key,
		Body: buffer,
		// add support for other image types besides .webm going forward
	};

	const result = await s3.upload(uploadParams).promise();

	return public ? result.Location : result.Key;
};

const deleteFile = async (key) => {
	const deleteParams = {
		Bucket: NAME_OF_BUCKET,
		Key: key,
	};

	await s3.deleteObject(deleteParams).promise();
};

// const client = new S3Client({});

const deleteFiles = async (keys) => {
	// const command = new s3.DeleteObjectsCommand({
	//   Bucket: NAME_OF_BUCKET,
	//   Delete: {
	//     Objects: [keys],
	//   },
	// });

	const deleteParams = {
		Bucket: NAME_OF_BUCKET,
		Delete: {
			Objects: [keys],
		},
	};

	try {
		// const { Deleted } = await s3.deleteObjects(deleteParams);
		// console.log(
		//   `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`
		// );
		console.log(keys);
		const status = await s3.deleteObjects(deleteParams).promise();
		// console.log(Deleted.map((d) => ` • ${d.Key}`).join("\n"));
		console.log(status);
	} catch (err) {
		console.error(err);
	}
};

const singleFileUpload = async ({ file, public = false }) => {
	const { originalname, buffer } = file;
	const path = require("path");

	// Set the name of the file in your S3 bucket to the date in ms plus the
	// extension name.
	const Key = new Date().getTime().toString() + path.extname(originalname);
	const uploadParams = {
		Bucket: NAME_OF_BUCKET,
		Key: public ? `spots/${Key}` : Key,
		Body: buffer,
	};
	const result = await s3.upload(uploadParams).promise();

	// Return the link if public. If private, return the name of the file in your
	// S3 bucket as the key in your database for subsequent retrieval.
	return public ? result.Location : result.Key;
};

const multipleFilesUpload = async ({ files, public = false }) => {
	return await Promise.all(
		files.map((file) => {
			return singleFileUpload({ file, public });
		})
	);
};

const retrievePrivateFile = (key) => {
	let fileUrl;
	if (key) {
		fileUrl = s3.getSignedUrl("getObject", {
			Bucket: NAME_OF_BUCKET,
			Key: key,
		});
	}
	return fileUrl || key;
};

const storage = multer.memoryStorage({
	destination: function (req, file, callback) {
		callback(null, "");
	},
});

const singleMulterUpload = (nameOfKey) =>
	multer({ storage: storage }).single(nameOfKey);

const multipleMulterUpload = (nameOfKey) => {
	const foo = multer({ storage: storage }).array(nameOfKey);

	return foo;
};

module.exports = {
	s3,
	deleteFile,
	deleteFiles,
	singleFilePathUpload,
	singleFileUpload,
	multipleFilesUpload,
	retrievePrivateFile,
	singleMulterUpload,
	multipleMulterUpload,
};
