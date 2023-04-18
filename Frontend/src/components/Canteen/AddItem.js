import React from "react";
import Navbar from "../navbar/Navbar";
import {
  Box,
  Flex,
  Heading,
  Button,
  Select,
  useColorModeValue,
  FormLabel,
  Icon,
  RadioGroup,
  Radio,
  Stack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  InputGroup,
  InputLeftElement,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  IconButton,
  Input,
  FormControl,
  Spinner,
} from "@chakra-ui/react";
import { MdFilterAlt } from "react-icons/md";
import ProductCanteen from "../../pages/Product/ProductCanteen";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageViewer from "react-simple-image-viewer";
import { ViewIcon } from "@chakra-ui/icons";

export default function AddItem() {
  const [itm, setItm] = useState([]);
  const [file, setFile] = useState("");
  const [cat, setCat] = useState([]);
  const [onfilter, setOFFfilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addItem, setAddItem] = useState({
    name: "",
    price: "",
    category: "",
    type: "Veg",
  });
  const [newList, setNewList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleFilter = (e) => {
    if (!e.target.value) {
      return setOFFfilter(false);
    }
    const updated = itm.filter((element) => {
      return element.category === e.target.value.trim();
    });
    setNewList(updated);
    setOFFfilter(true);
  };

  const getData = async () => {
    try {
      const res = await fetch("/getcategories", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      const data = await res.json();
      setCat(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "items"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setItm(list);
    });
    return unsub;
  }, []);

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAddItem({ ...addItem, [name]: value });
  };

  const handleSubmit = async () => {
    const { name, price, category, type } = addItem;
    if (!name || !price || !category || !type) {
      return alert("Enter all fields");
    }
    setAddItem(addItem);
    await addDoc(collection(db, "items"), {
      ...addItem,
      timestamp: serverTimestamp(),
    });
    onClose();
  };

  const handleUpdate = async () => {
    console.log(addItem);
      await updateDoc(doc(db, "items", addItem.id), {
        ...addItem,
        timestamp: serverTimestamp(),
      });
      onClose();
  }

  useEffect(() => {
    const uploadFile = () => {
      const imgname = new Date().getTime() + file.name;
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name + imgname);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setLoading(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log("Error in uploading", error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAddItem((prev) => ({ ...prev, image: downloadURL }));
            console.log("File available at", downloadURL);
            setLoading(false);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const showUpdate = (dataa) => {
    setShowUpdateModal(true);
    // console.log(dataa);
    onOpen();
    setAddItem(dataa);
  };

  return (
    <>
      <Navbar />
      <Box
        p="2"
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        borderBottom={1}
      >
        <Flex
          h={16}
          p="8"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            w="100"
            gap="30px"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Heading as="h2" size="lg" noOfLines={1}>
              Add Item
            </Heading>
          </Box>
          <Button colorScheme="teal" onClick={onOpen}>
            + Add Item
          </Button>
        </Flex>
      </Box>
      <Box p="8" display="flex" alignItems="center" gap="20px">
        <FormLabel>
          Filter <Icon as={MdFilterAlt} />
        </FormLabel>
        <Select placeholder="Select option" w="2xl" onChange={handleFilter}>
          {cat.map((item) => {
            return (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box p="8">
        <SimpleGrid minChildWidth="250px" spacing={2} p="10">
          <Box>
            {onfilter ? (
              <ProductCanteen itm={newList} update={showUpdate} />
            ) : (
              <ProductCanteen itm={itm} update={showUpdate} />
            )}
          </Box>
        </SimpleGrid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {showUpdateModal ? (
            <ModalHeader>Update Item</ModalHeader>
          ) : (
            <ModalHeader>Add Item</ModalHeader>
          )}
          <ModalCloseButton onChange={() => addItem([""])} />
          <ModalBody>
            <FormControl p="2">
              <FormLabel>Food Name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="🍴"
                />
                <Input
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  defaultValue={addItem.name}
                  onChange={handleInputs}
                />
              </InputGroup>
            </FormControl>
            <FormControl p="2">
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="₹"
                />
                <Input
                  placeholder="Enter amount"
                  type="number"
                  name="price"
                  defaultValue={addItem.price}
                  onChange={handleInputs}
                />
              </InputGroup>
            </FormControl>
            <FormControl p="2">
              <FormLabel>Select Category</FormLabel>
              <Select
                placeholder="Select option"
                w="l"
                defaultValue={addItem.category}
                name="category"
                onChange={handleInputs}
              >
                {cat.map((item) => {
                  return (
                    <option key={item.id} value={item.category}>
                      {item.category}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl p="2">
              <FormLabel>Select Type</FormLabel>
              <RadioGroup defaultValue={addItem.type} name="type">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="green"
                    value="Veg"
                    name="type"
                    onChange={handleInputs}
                  >
                    Veg
                  </Radio>
                  <Radio
                    colorScheme="red"
                    value="Non-Veg"
                    name="type"
                    onChange={handleInputs}
                  >
                    Non-Veg
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl p="2">
              <FormLabel>Add Image</FormLabel>
              <Box display="flex">
                <Input
                  w="64"
                  type="file"
                  p="1"
                  onChange={(e) => setFile(e.target.files[0])}
                ></Input>
                {loading && (
                  <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="lg"
                  />
                )}
                {addItem.image && (
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="View Image"
                    icon={<ViewIcon />}
                    onClick={() => setIsViewerOpen(true)}
                  />
                )}
                {isViewerOpen && (
                  <ImageViewer
                    src={[addItem.image]}
                    onClose={() => setIsViewerOpen(false)}
                    disableScroll={false}
                    backgroundStyle={{
                      backgroundColor: "rgba(0,0,0,0.9)",
                    }}
                    closeOnClickOutside={true}
                  />
                )}
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            {showUpdateModal ? <Button colorScheme="teal" mr={3} onClick={handleUpdate}>
              Update
            </Button> : <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Save
            </Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
