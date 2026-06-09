// controllers/message.controller.js

import Message from
"../model/message.model.js";

export const getMessages =
  async (req, res) => {

    try {

      const messages =
        await Message.find({

          receiverId:
            req.user.id,

        })
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        success: true,

        count:
          messages.length,

        messages,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

  export const markMessageRead =
  async (req, res) => {

    try {

      const message =
        await Message.findById(
          req.params.id
        );

      if (!message) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Message not found",
          });
      }

      message.isRead = true;

      await message.save();

      return res.status(200).json({

        success: true,

        message:
          "Marked as read",
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

  export const getUnreadCount =
  async (req, res) => {

    try {

      const count =
        await Message.countDocuments({

          receiverId:
            req.user.id,

          isRead: false,
        });

      return res.status(200).json({

        success: true,

        count,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };